// ===============================================================================================


import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSearchHistory } from "../../hooks/useSearchHistory";
import { useSearch } from "../../controllers/useSearch";
import SearchForm from "../../widgets/web/searching/SearchForm";
import SearchHistory from "../../widgets/web/searching/SearchHistory";
import EntityCard from "../../widgets/web/searching/EntityCard";
import ProductCard from "../../widgets/web/searching/ProductCard";
import { useSettings } from "../../context/settings/PublicSettingsContext";
import { Loading } from "../../components/ui/LoadingInset";
import WEBROUTES from "../../routers/web/path";



export default function SearchPage() {
    const { settingsQuery }             = useSettings();
    const settings                      = settingsQuery.data ;

    const [params, setParams] = useSearchParams();
    const query = params.get("q")?.trim() ?? "";

    const [input, setInput] = useState(query);
    const { history, add, remove, clear } = useSearchHistory();
    const { data, isFetching, isError, refetch } = useSearch(query);

    useEffect(() => setInput(query), [query]);

    const submit = (value: string) => {
        const q = value.trim();
        if (!q) return;
        setParams({ q });
        add(q);
    };

    const total = data ? data.products.length + data.brands.length + data.categories.length : 0;
    const isEmpty = !!data && total === 0;

  return (
    <main className="search-page">
      <div className={`search-page__container ${!data ? 'search-page__emptyContainer' : ''}`}>
        <header className="search-page__header web_container">
            <Link to={WEBROUTES.HOME} > 
                <img src={settings?.icon} alt="" loading="lazy"  className="search_logo"/> 
            </Link>
            <SearchForm value={input} onChange={setInput} onSubmit={submit} />
        </header>
        <div className="web_container">
        {!query && (<SearchHistory items={history} onSelect={submit} onRemove={remove} onClear={clear} />)}
        {query && isFetching && <Loading />}
        {query && isError && !isFetching && (
          <div className="search-state search-state--error">
            <p>Something went wrong. Please try again.</p>
            <button className="btn" onClick={() => refetch()}>Retry</button>
          </div>
        )}
        {isEmpty && !isFetching && (
          <div className="search-state">
            <p className="search-state__title">No results for "{query}"</p>
            <p>Check the spelling or try a more general word (brand, category, product type).</p>
          </div>
        )}
        {data && total > 0 && !isFetching && (
          <div className="search-results">
            <p className="search-results__summary text text_sm"> {total} result{total > 1 ? "s" : ""} for <strong>"{data.query}"</strong></p>

            {data.categories.length > 0 && (
              <section className="search-section">
                <h2 className="text text_lg">Categories</h2>
                <div className="search-grid search-grid--entities">
                  {data.categories.map((c) => (
                    <EntityCard key={c.id} to={WEBROUTES.CATEGORY(c.id)} title={c.title} image={c.image} />
                  ))}
                </div>
              </section>
            )}

            {/* {data.brands.length > 0 && (
              <section className="search-section">
                <h2 className="text text_lg">Brands</h2>
                <div className="search-grid search-grid--entities">
                  {data?.brands.map((b) => (
                    <EntityCard key={b.id} to={`/brands/${b.id}`} title={b.title} image={b.image} />
                  ))}
                </div>
              </section>
            )} */}

            {data.products.length > 0 && (
              <section className="search-section">
                <h2 className="text text_lg">Products</h2>
                <div className="search-grid search-grid--products">
                  {data?.products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
        </div>
      </div>
    </main>
  );
}