
import { useMemo, useState } from "react";
import { ShieldCheck, Search, SearchX, RotateCcw} from "lucide-react";
import { usePoliciesPublic } from "../../controllers/usePolicy";
import PolicyCard from "../../widgets/web/policies/PolicyCard";
import PolicySkeleton from "../../widgets/web/policies/PolicySkeleton";
import { useTranslation } from "react-i18next";
import PolicyImage from "../../assets/images/policy.png"






const Policies = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const { data: policies = [], isLoading, isError, refetch, isFetching} = usePoliciesPublic();

    const filteredPolicies = useMemo(() => {
        const term = search.trim().toLocaleLowerCase("fr");
        if (!term) {return policies;}
        return policies.filter((policy) => {
        return (policy.title.toLocaleLowerCase("fr").includes(term) || policy.description.toLocaleLowerCase("fr").includes(term));
        });
    }, [policies, search]);

    const togglePolicy = (id: string) => {setExpandedId((current) => (current === id ? null : id));};

    return (
        <main className="policies-page">
            <section className="policies-hero">
                <div className="policies-hero__decoration policies-hero__decoration--one" />
                <div className="policies-hero__decoration policies-hero__decoration--two" />

                <div className="policies-container web_container policies-hero__inner">
                    <div className="policies-hero__badge">
                        <ShieldCheck size={16} />
                        <span>{t("store.policies.heroBadge")}</span>
                    </div>

                    <h1 className="policies-hero__title"> 
                        {t("store.policies.heroTitle")}{" "}
                        <span>{t("store.policies.heroTitleHighlight")}</span>
                    </h1>

                    <p className="policies-hero__description"> {t("store.policies.heroDescription")} </p>

                    <div className="policies-hero__trust">
                        <span className="policies-hero__trust-icon"> <ShieldCheck size={19} /></span>
                        <span>
                            <strong> {t("store.policies.trustTitle")} </strong>
                            <small>{t("store.policies.trustDescription")}</small>
                        </span>
                    </div>
                    <div className="policies-hero__image"> <img src={PolicyImage} alt="" /> </div>                  
                </div>
            </section>
            <section className="policies-content">
                <div className="policies-container web_container">
                    <div className="policies-toolbar">
                        <div className="policies-toolbar__intro">
                        <h2>{t("store.policies.sectionTitle")}</h2>
                        <p>{t("store.policies.sectionDescription")}</p>
                        </div>

                        {!isLoading && !isError && (
                        <div className="policies-count">
                            <span className="policies-count__number"> {filteredPolicies.length}</span>
                            <span>{filteredPolicies.length > 1 ? t("store.policies.documentCount_other") : t("store.policies.documentCount_one")}</span>
                        </div>
                        )}
                    </div>

                    <label className="policies-search">
                        <Search size={20} aria-hidden="true" />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder={t("store.policies.searchPlaceholder")}
                            aria-label={t("store.policies.searchLabel")}/>

                            {search && (
                            <button type="button" className="policies-search__clear" onClick={() => setSearch("")} aria-label={t("store.policies.searchLabel")}>
                                <span className="text text_xs">{t("store.policies.clear")}</span>
                            </button>
                            )}
                    </label>

                    {isLoading ? (
                        <div className="policies-list" aria-label={t("store.policies.loading")}>
                            {Array.from({ length: 3 }).map((_, index) => (<PolicySkeleton key={index} />))}
                        </div>
                    ) : isError ? (
                        <div className="policies-state policies-state--error" role="alert">
                            <span className="policies-state__icon"><RotateCcw size={25} /></span>
                            <h3>{t("store.policies.loadErrorTitle")}</h3>
                            <p> {t("store.policies.loadErrorDescription")} </p>

                            <button type="button" className="policies-state__button" onClick={() => void refetch()} disabled={isFetching}>
                                <RotateCcw size={16} />
                                <div className="text text_xs"> {isFetching ? t("store.policies.loadingButton") : t("store.policies.retry")} </div>
                            </button>
                        </div>
                    ) : filteredPolicies.length > 0 ? (
                        <div className="policies-list">
                            {filteredPolicies.map((policy, index) => (
                                <PolicyCard key={policy.id}  policy={policy} index={index} expanded={expandedId === policy.id} onToggle={() => togglePolicy(policy.id)}/>
                            ))}
                        </div>
                    ) : (
                        <div className="policies-state">
                            <span className="policies-state__icon"><SearchX size={27} /></span>
                            <h3>{search ? t("store.policies.noResultsTitle") : t("store.policies.emptyTitle")}</h3>
                            <p> {search ? t("store.policies.noResultsDescription") : t("store.policies.emptyDescription")}</p>

                            {search && (
                                <button type="button" className="btn primary md my_start_12" onClick={() => setSearch("")}>
                                    <span className="text text_sm">{t("store.policies.clearSearch")}</span>
                                </button>
                            )}
                        </div>
                    )}

                    <aside className="policies-note">
                        <span className="policies-note__icon"><ShieldCheck size={23} /></span>
                        <div>
                            <h3>{t("store.policies.helpTitle")}</h3>
                            <p>{t("store.policies.helpDescription")}</p>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
};

export default Policies;