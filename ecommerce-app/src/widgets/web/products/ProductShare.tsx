

import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Share2, Copy, Check, MessageCircle, Send, Mail, X, Link, Share} from "lucide-react";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";


interface ProductShareProps {title: string; description?: string;}



export default function ProductShare({ title, description = "",}: ProductShareProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [shareError, setShareError] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const socialNetworks = [
        {
            id: "whatsapp",
            className: "whatsapp",
            label: "WhatsApp",
            ariaLabel: t("store.drops.shareWhatsApp"),
            icon: <MessageCircle size={21} />,
        },
        {
            id: "facebook",
            className: "facebook",
            label: "Facebook",
            ariaLabel: t("store.drops.shareFacebook"),
            icon: <FaFacebook size={21} />,
        },
        {
            id: "telegram",
            className: "telegram",
            label: "Telegram",
            ariaLabel: t("store.drops.shareTelegram"),
            icon: <Send size={20} />,
        },
        {
            id: "x",
            className: "x",
            label: "Réseau X",
            ariaLabel: t("store.drops.shareX"),
            icon: <X size={21} />,
        },
        {
            id: "linkedin",
            className: "linkedin",
            label: "LinkedIn",
            ariaLabel: t("store.drops.shareLinkedIn"),
            icon: <FaLinkedinIn size={21} />,
        },
        {
            id: "email",
            className: "email",
            label: "E-mail",
            ariaLabel: t("store.drops.shareEmail"),
            icon: <Mail size={21} />,
        },
    ] as const;

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {setIsOpen(false);}
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {setIsOpen(false);}
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    function getProductUrl() {
        return window.location.href;
    }

    async function copyProductLink() {
        const url = getProductUrl();

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(url);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = url;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();

                const success = document.execCommand("copy");
                textarea.remove();

                if (!success) {
                    throw new Error(t("store.drops.copyError"));
                }
            }

            setCopied(true);
            setShareError("");

            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setShareError("Impossible de copier le lien. Réessayez.");
        }
    }

    function openSocialShare(platform: string) {
        const url = getProductUrl();
        const shareText = `${title}${description ? ` — ${description}` : ""}`;
        const encodedUrl = encodeURIComponent(url);
        const encodedText = encodeURIComponent(shareText);

        const shareUrls: Record<string, string> = {
            whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
            telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%0A${encodedUrl}`,
        };

        const targetUrl = shareUrls[platform];

        if (!targetUrl) return;

        if (platform === "email") {
            window.location.href = targetUrl;
        } else {
            window.open(targetUrl, "_blank", "noopener,noreferrer");
        }

        setIsOpen(false);
    }

    async function shareWithDevice() {
        const shareData = {title, text: description ? `${title} — ${description}` : title, url: getProductUrl()};
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                setIsOpen(false);
                setShareError("");
            } catch (error) {
                if (error instanceof Error && error.name !== "AbortError") {setShareError(t("store.drops.shareError"));}
            }
        } else {await copyProductLink();}
    }

    return (
        <div className="product-share" ref={dropdownRef}>
            <button type="button" className={`product-share__trigger ${isOpen ? "is-active" : ""}`}
                onClick={() => {setIsOpen((prev) => !prev); setShareError("");}}
                aria-label="Partager ce produit"
                aria-expanded={isOpen}
                aria-haspopup="menu"
                title="Partager ce produit">
                <Share2 size={19} strokeWidth={1.8} />
            </button>

            {isOpen && (
                <div className="product-share__dropdown" role="menu" aria-label="Options de partage">

                    <div className="product-share__header">
                        <div>
                            <div className="text text_sm weight_600"> {t("store.drops.shareProduct")} </div>
                            <div className="text text_sm"> {t("store.drops.shareDescription")}  </div>
                        </div>

                        <button type="button" className="product-share__close" onClick={() => setIsOpen(false)} aria-label="Fermer">
                            <X size={17} />
                        </button>
                    </div>


                    <button type="button" className="product-share__copy" onClick={copyProductLink} role="menuitem">
                        <span className="product-share__copy-icon">
                            {copied ? (<Check size={19} />) : (<Copy size={19} />)}
                        </span>

                        <span className="product-share__copy-text">
                            <div className="text text_sm weight_600">{copied ? t("store.drops.copied") : t("store.drops.copyLink") }</div>
                            <div className="text text_xs"> {copied ? t("store.drops.linkReady") : t("store.drops.copyProductLink")}</div>
                        </span>

                        {copied ? (<Check className="product-share__success" size={18}/>) : (<Link className="product-share__trailing" size={17}/>)}
                    </button>

                    <div className="product-share__separator"><div className="text text_xs"> {t("store.drops.shareVia")} </div></div>

                    <div className="product-share__socials">
                        {socialNetworks.map((social) => (
                            <button
                                key={social.id}
                                type="button"
                                className={`product-share__social product-share__social--${social.className}`}
                                onClick={() => openSocialShare(social.id)}
                                aria-label={social.ariaLabel}
                                title={social.label}>
                                {social.icon}

                                <div className="text text_xs">{social.label}</div>
                            </button>
                        ))}
                    </div>

                    <button type="button" className="product-share__native" onClick={shareWithDevice}>
                        <Share size={17} />
                        <div className="text text_xs"> {t("store.drops.otherShareOptions")} </div>
                    </button>

                    {shareError && (<p className="product-share__error" role="status"> {shareError} </p>)}

                    <p className="product-share__footer">{t("store.drops.shareFooter")}</p>
                </div>
            )}
        </div>
    );
}