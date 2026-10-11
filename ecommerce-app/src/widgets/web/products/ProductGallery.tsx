
import {useCallback,useEffect,useRef,useState} from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent} from "react";
import type { IProductImage } from "../../../types/productTypes";
import ImagePlaceholder from "../../../assets/images/placeholder_product.png";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProductGalleryProps {images: IProductImage[]; productTitle: string;}

interface Point {x: number; y: number;}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

export default function ProductGallery({images, productTitle}: ProductGalleryProps) {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [zoom, setZoom] = useState(MIN_ZOOM);
    const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
    const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
    const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());

    const touchStartRef = useRef<Point | null>(null);
    const pinchStartDistanceRef = useRef<number | null>(null);
    const pinchStartZoomRef = useRef(1);
    const swipeStartRef = useRef<Point | null>(null);
    const panStartRef = useRef<{pointer: Point; offset: Point;} | null>(null);

    const safeIndex = images.length > 0 ? Math.min(selectedImage, images.length - 1): 0;

    const currentImage = images[safeIndex];

    const getImageSrc = useCallback(
        (image?: IProductImage) => {
            if (!image?.image) return ImagePlaceholder;
            if (failedImages.has(image.image)) return ImagePlaceholder;
            return image.image;
        },
        [failedImages]
    );

    const resetZoom = useCallback(() => {
        setZoom(MIN_ZOOM);
        setOffset({ x: 0, y: 0 });
        setZoomOrigin("50% 50%");
        touchStartRef.current = null;
        pinchStartDistanceRef.current = null;
        swipeStartRef.current = null;
        panStartRef.current = null;
    }, []);

    const selectImage = useCallback(
        (index: number) => {
            if (images.length === 0) return;
            const nextIndex = (index + images.length) % images.length;
            setSelectedImage(nextIndex);
            resetZoom();
        },
        [images.length, resetZoom]
    );

    const showPrevious = useCallback(() => {selectImage(safeIndex - 1);}, [safeIndex, selectImage]);
    const showNext = useCallback(() => {selectImage(safeIndex + 1);}, [safeIndex, selectImage]);
    const openViewer = () => {resetZoom(); setIsViewerOpen(true);};

    const closeViewer = useCallback(() => {setIsViewerOpen(false); resetZoom();}, [resetZoom]);

    const markImageFailed = (src: string) => {
        if (src === ImagePlaceholder) return;
        setFailedImages((previous) => {
            const next = new Set(previous);
            next.add(src);
            return next;
        });
    };

    // Hover zoom origin for the main image and fullscreen image.
    const updateZoomOrigin = (event: ReactMouseEvent<HTMLImageElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setZoomOrigin(`${x}% ${y}%`);
    };

    // Mouse-wheel zoom in fullscreen.
    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        setZoomOrigin(`${x}% ${y}%`);
        setZoom((previous) => {
            const next = previous + (event.deltaY < 0 ? 0.25 : -0.25);
            return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
        });
        if (zoom <= 1 && event.deltaY > 0) {setOffset({ x: 0, y: 0 });}
    };

    const getTouchDistance = (touches: React.TouchList) => {
        const first = touches[0];
        const second = touches[1];
        if (!first || !second) return 0;
        return Math.hypot(
            second.clientX - first.clientX,
            second.clientY - first.clientY
        );
    };

    
    // Touch gestures: pinch to zoom, drag to pan, swipe to change image.
    const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
        if (event.touches.length === 2) {
            pinchStartDistanceRef.current = getTouchDistance(event.touches);
            pinchStartZoomRef.current = zoom;
            swipeStartRef.current = null;
            touchStartRef.current = null;
            return;
        }

        const touch = event.touches[0];
        if (!touch) return;

        const point = {
            x: touch.clientX,
            y: touch.clientY,
        };

        touchStartRef.current = point;
        swipeStartRef.current = point;
    };

    const handleTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
        if (event.touches.length === 2) {
            event.preventDefault();

            const startDistance = pinchStartDistanceRef.current;
            const currentDistance = getTouchDistance(event.touches);

            if (!startDistance || !currentDistance) return;

            const nextZoom =
                pinchStartZoomRef.current *
                (currentDistance / startDistance);

            setZoom(
                Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom))
            );
            return;
        }

        if (event.touches.length !== 1) return;

        const touch = event.touches[0];
        const start = touchStartRef.current;

        if (!touch || !start || zoom <= 1) return;

        event.preventDefault();

        const current = {
            x: touch.clientX,
            y: touch.clientY,
        };

        setOffset((previous) => ({
            x: previous.x + current.x - start.x,
            y: previous.y + current.y - start.y,
        }));

        touchStartRef.current = current;
    };

    
    const handleTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
        if (event.touches.length < 2) {pinchStartDistanceRef.current = null;}

        if (event.touches.length === 0) {
            const start = swipeStartRef.current;
            const changed = event.changedTouches[0];

            if (start && changed && zoom <= 1) {
                const dx = changed.clientX - start.x;
                const dy = changed.clientY - start.y;

                if (
                    Math.abs(dx) > 65 &&
                    Math.abs(dx) > Math.abs(dy) * 1.2
                ) {
                    dx < 0 ? showNext() : showPrevious();
                }
            }

            touchStartRef.current = null;
            swipeStartRef.current = null;
        } else if (event.touches.length === 1) {
            const touch = event.touches[0];

            if (touch) {
                touchStartRef.current = {
                    x: touch.clientX,
                    y: touch.clientY,
                };
            }
        }
    };

    // Mouse drag to move around a zoomed image.
    const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
        if (zoom <= 1) return;
        event.preventDefault();
        panStartRef.current = {
            pointer: {
                x: event.clientX,
                y: event.clientY,
            },
            offset: { ...offset },
        };
    };

    const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
        const start = panStartRef.current;
        if (!start || zoom <= 1) return;

        setOffset({
            x:
                start.offset.x +
                event.clientX -
                start.pointer.x,
            y:
                start.offset.y +
                event.clientY -
                start.pointer.y,
        });
    };

    const stopMousePan = () => {panStartRef.current = null;};

    const toggleZoom = () => {
        if (zoom > 1) {
            resetZoom();
        } else {
            setZoom(2);
        }
    };

    useEffect(() => {
        if (!isViewerOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeViewer();

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                showPrevious();
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                showNext();
            }

            if (event.key === "+" || event.key === "=") {
                setZoom((previous) =>
                    Math.min(MAX_ZOOM, previous + 0.25)
                );
            }

            if (event.key === "-") {
                setZoom((previous) => {
                    const next = Math.max(MIN_ZOOM, previous - 0.25);

                    if (next === MIN_ZOOM) {
                        setOffset({ x: 0, y: 0 });
                    }

                    return next;
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isViewerOpen, closeViewer, showPrevious, showNext]);

    useEffect(() => {
        if (selectedImage >= images.length) {
            setSelectedImage(Math.max(images.length - 1, 0));
        }
    }, [images.length, selectedImage]);

    const viewerImageStyle: CSSProperties = {
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
        transformOrigin: zoomOrigin,
    };

    return (
        <>
        
            <div className="product-gallery">
                <button type="button" className="product-gallery__main" onClick={openViewer} 
                    aria-label={t("store.productGallery.openImages", { productTitle })}>
                    <img
                        src={getImageSrc(currentImage)}
                        alt={productTitle}
                        className="product-gallery__main-image"
                        onMouseMove={updateZoomOrigin}
                        onError={(event) => markImageFailed(event.currentTarget.src)}
                        style={{"--zoom-origin": zoomOrigin} as CSSProperties}/>

                    <span className="product-gallery__zoom-hint">
                        <div aria-hidden="true">⌕</div>
                        <div className="text text_xs"> {t("store.productGallery.zoomHint")} </div>
                    </span>
                </button>

                {images.length > 1 && (
                    <div className="product-gallery__thumbnails" aria-label={t("store.productGallery.productImages")}>
                        {images.map((image, index) => (
                            <button
                                key={image.id}
                                type="button"
                                className={safeIndex === index ? "product-gallery__thumbnail active" : "product-gallery__thumbnail"}
                                onClick={() => selectImage(index)}
                                aria-label={t("store.productGallery.viewImage", { index: index + 1 })}
                                aria-pressed={safeIndex === index}>
                                <img
                                    src={getImageSrc(image)}
                                    alt={`${productTitle} ${index + 1}`}
                                    onError={(event) => markImageFailed(event.currentTarget.src)}/>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {isViewerOpen && (
                <div className="product-viewer" role="dialog" aria-modal="true" 
                    aria-label={t("store.productGallery.imageGallery", { productTitle })} onClick={closeViewer}>
                    <button
                        type="button"
                        className="product-viewer__close"
                        onClick={closeViewer}
                        aria-label={t("store.productGallery.closeViewer")}>
                        {/* &times; */}
                        <X/>
                    </button>

                    <div className="product-viewer__content" onClick={(event) => event.stopPropagation()}>
                        <div className="product-viewer__topbar">
                            <span className="product-viewer__title text text_sm white p_limit_1">{productTitle}</span>

                            <span className="product-viewer__counter text text_sm white ">
                                {images.length ? safeIndex + 1 : 0} {" / "} {images.length}
                            </span>
                        </div>

                        <div className="product-viewer__stage">
                            {images.length > 1 && (
                                <button type="button"
                                    className="product-viewer__nav product-viewer__nav--prev"
                                    onClick={showPrevious}
                                    aria-label={t("store.productGallery.previousImage")}>
                                        <ChevronLeft/>
                                </button>
                            )}

                            <div
                                className={`product-viewer__image-wrap ${zoom > 1 ? "is-zoomed" : ""}`}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                onWheel={handleWheel}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={stopMousePan}
                                onMouseLeave={stopMousePan}
                                onDoubleClick={toggleZoom}>
                                <img
                                    src={getImageSrc(currentImage)}
                                    alt={`${productTitle} image ${safeIndex + 1}`}
                                    className="product-viewer__image"
                                    style={viewerImageStyle}
                                    draggable={false}
                                    onError={(event) =>markImageFailed(event.currentTarget.src)}/>
                            </div>

                            {images.length > 1 && (
                                <button type="button"
                                    className="product-viewer__nav product-viewer__nav--next"
                                    onClick={showNext}
                                    aria-label={t("store.productGallery.nextImage")}>
                                    <ChevronRight/>
                                </button>
                            )}
                        </div>

                        <div className="product-viewer__controls">
                            <button type="button" className="product-viewer__zoom-button" onClick={toggleZoom}>
                                {zoom > 1 ? t("store.productGallery.reduce") : t("store.productGallery.enlarge")}
                            </button>

                            <span className="product-viewer__tip text text_xs p_limit_1">
                                {t("store.productGallery.zoomInstructions")}
                            </span>
                        </div>

                        {images.length > 1 && (
                            <div className="product-viewer__thumbnails">
                                {images.map((image, index) => (
                                    <button
                                        key={image.id}
                                        type="button"
                                        className={safeIndex === index ? "product-viewer__thumbnail active" : "product-viewer__thumbnail"}
                                        onClick={() => selectImage(index)}
                                        aria-label={t("store.productGallery.viewImage", { index: index + 1 })}
                                        aria-pressed={safeIndex === index}>
                                        <img
                                            src={getImageSrc(image)}
                                            alt=""
                                            onError={(event) =>markImageFailed(event.currentTarget.src)}/>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

        </>
    );
}