"use client";

import { FormEvent, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: "New arrivals" | "Best sellers" | "Clothing" | "Accessories" | "Home" | "Beauty";
  price: number;
  oldPrice?: number;
  image: string;
  tone: string;
  badge?: string;
  rating: number;
  reviews: number;
  description: string;
};

const images = {
  knit: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85",
  coat: "https://images.unsplash.com/photo-1548624149-fbca32f0d43a?auto=format&fit=crop&w=900&q=85",
  shirt: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
  jacket: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
  denim: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
  bag: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
  shoe: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
  watch: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
  glasses: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
  bottle: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
  candle: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
  chair: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85",
  lamp: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
  vase: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=85",
  skin: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
  perfume: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
  cap: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85",
  socks: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=900&q=85",
};

const products: Product[] = [
  ["Alma oversized knit", "New arrivals", 118, "knit", "#e8ddd2", "New"],
  ["The Soho trench", "New arrivals", 260, "coat", "#d8d4c8", "Limited"],
  ["Everyday heavyweight tee", "Best sellers", 48, "shirt", "#d2d9d0", "Best seller"],
  ["Heritage canvas tote", "Best sellers", 84, "bag", "#d6c2aa", "Best seller"],
  ["Celine wool blazer", "Clothing", 224, "coat", "#cfc3b8"],
  ["Riley relaxed denim", "Clothing", 112, "denim", "#9fafd1"],
  ["Cloud fleece zip", "Clothing", 128, "jacket", "#d8ced1", "New"],
  ["Lyra silk shirt", "Clothing", 132, "shirt", "#f1e6de"],
  ["Nina rib tank", "Clothing", 38, "shirt", "#e2ddd4"],
  ["Parc chore jacket", "Clothing", 168, "jacket", "#b6b8a6"],
  ["Studio wide-leg trouser", "Clothing", 142, "denim", "#c4bdac"],
  ["Satin slip midi", "Clothing", 154, "coat", "#e4ccca"],
  ["Line merino cardigan", "Clothing", 124, "knit", "#c9d1c5"],
  ["Market cropped crew", "Clothing", 76, "knit", "#dbc7bd"],
  ["Peak trail vest", "Clothing", 136, "jacket", "#a7b1ab"],
  ["Column Oxford shirt", "Clothing", 98, "shirt", "#dce3eb"],
  ["Luna leather shoulder bag", "Accessories", 248, "bag", "#bd9c85", "New"],
  ["Mara weekend duffle", "Accessories", 188, "bag", "#b49779"],
  ["Core low-top sneaker", "Accessories", 126, "shoe", "#d6ddd7", "Best seller"],
  ["Sunday house slipper", "Accessories", 64, "shoe", "#d5c2ab"],
  ["Arc solar watch", "Accessories", 194, "watch", "#d6c8b4"],
  ["Clara oval frames", "Accessories", 94, "glasses", "#c6b498"],
  ["Cove silk scarf", "Accessories", 68, "cap", "#d9b9a5"],
  ["Field baseball cap", "Accessories", 42, "cap", "#c5d0bf"],
  ["Ribbed cotton socks, 3-pack", "Accessories", 28, "socks", "#d4d5d0"],
  ["Transit card holder", "Accessories", 44, "bag", "#c2ad9c"],
  ["Terrace house candle", "Home", 42, "candle", "#e6ddd0", "New"],
  ["Lowland linen throw", "Home", 136, "knit", "#d5c6b5"],
  ["Aster ceramic vase", "Home", 72, "vase", "#d7d0c5"],
  ["Solis table lamp", "Home", 164, "lamp", "#d2c6b6"],
  ["Vale oak lounge chair", "Home", 420, "chair", "#c6b5a0"],
  ["Moss stoneware mug", "Home", 24, "vase", "#bcc4b9"],
  ["Woven market basket", "Home", 58, "bag", "#d4bd9b"],
  ["Quiet morning diffuser", "Home", 52, "candle", "#d2c7bd"],
  ["Reed bed linen set", "Home", 178, "knit", "#e2d9d1"],
  ["Hand-thrown dinner plate", "Home", 26, "vase", "#d6d6cb"],
  ["Cedar bath tray", "Home", 86, "chair", "#c3aa8e"],
  ["Daily reset cleanser", "Beauty", 32, "skin", "#dce6dd", "New"],
  ["Golden hour face oil", "Beauty", 54, "skin", "#e8caa8"],
  ["Soft focus lip balm", "Beauty", 18, "skin", "#e9b7ad"],
  ["Neroli eau de parfum", "Beauty", 96, "perfume", "#e6d5b7"],
  ["Drift body wash", "Beauty", 28, "skin", "#c6d3d0"],
  ["Morning ritual set", "Beauty", 76, "skin", "#e0c8b7", "Giftable"],
  ["Bloom hand cream", "Beauty", 22, "skin", "#e2cec6"],
  ["Aura mineral SPF 50", "Beauty", 34, "skin", "#ddd6ad"],
  ["Nude polish duo", "Beauty", 30, "skin", "#d6aaa0"],
  ["Rainy day incense", "Home", 34, "candle", "#b9b1a4"],
  ["Horizon carry-on", "Accessories", 312, "bag", "#b0bfc2"],
  ["Dune suede sneaker", "Accessories", 148, "shoe", "#d9c5a2"],
  ["Linen utility overshirt", "Clothing", 138, "shirt", "#c5d2c0"],
  ["Wool blend peacoat", "Clothing", 244, "coat", "#33434c", "Last chance"],
  ["Marble serving bowl", "Home", 88, "vase", "#e4e1d8"],
  ["The everyday hoop", "Accessories", 58, "watch", "#d5bb7e"],
  ["Ritual bath salts", "Beauty", 26, "skin", "#dce5e2"],
  ["Cove cashmere beanie", "Accessories", 62, "cap", "#c4b3a5"],
  ["Sunday paperback stand", "Home", 64, "chair", "#b8a187"],
  ["Air weight running tee", "Clothing", 58, "shirt", "#cbd9e0"],
  ["Fig leaf room spray", "Home", 38, "perfume", "#cbd0bb"],
  ["Sea salt hand wash", "Beauty", 24, "skin", "#c6d9da"],
  ["Woven leather belt", "Accessories", 72, "bag", "#b28e74"],
].map(([name, category, price, image, tone, badge], index) => ({
  id: index + 1,
  name: name as string,
  category: category as Product["category"],
  price: price as number,
  oldPrice: index % 11 === 0 ? Math.round((price as number) * 1.23) : undefined,
  image: images[image as keyof typeof images],
  tone: tone as string,
  badge: badge as string | undefined,
  rating: 4.6 + (index % 4) / 10,
  reviews: 18 + index * 7,
  description: "Thoughtfully made for the pace of everyday life—beautiful, useful, and built to stay in rotation.",
}));

const categories = ["All", "New arrivals", "Best sellers", "Clothing", "Accessories", "Home", "Beauty"] as const;

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Product[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [notice, setNotice] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) =>
      (activeCategory === "All" || product.category === activeCategory) &&
      (!query || `${product.name} ${product.category}`.toLowerCase().includes(query)),
    );
  }, [activeCategory, search]);

  const visibleProducts = showAll || search || activeCategory !== "All" ? filteredProducts : filteredProducts.slice(0, 8);
  const subtotal = cart.reduce((sum, product) => sum + product.price, 0);

  function addToCart(product: Product) {
    setCart((current) => [...current, product]);
    setNotice(`${product.name} added to your bag`);
    setQuickView(null);
  }

  function removeFromCart(id: number) {
    setCart((current) => {
      const index = current.findIndex((item) => item.id === id);
      return index === -1 ? current : [...current.slice(0, index), ...current.slice(index + 1)];
    });
  }

  function toggleSave(id: number) {
    setSaved((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("You’re on the list. Welcome to the good stuff.");
    event.currentTarget.reset();
  }

  return (
    <main>
      {notice && <button className="toast" onClick={() => setNotice("")}>{notice} <span>×</span></button>}

      <div className="shipping-bar">Complimentary shipping on orders over $100 <span>•</span> Easy returns within 30 days</div>
      <header className="site-header">
        <button className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <a className="wordmark" href="#top" aria-label="NOVA home">NOVA<span>.</span></a>
        <nav className={menuOpen ? "open" : ""} aria-label="Main navigation">
          <a href="#shop">Shop all</a><a href="#new">New arrivals</a><a href="#stories">Stories</a><a href="#about">Our world</a>
        </nav>
        <div className="header-actions">
          <label className="search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" aria-label="Search products" /></label>
          <button aria-label="Saved products" className="icon-button" onClick={() => setNotice(`${saved.length || "No"} saved item${saved.length === 1 ? "" : "s"}`)}>♡<sup>{saved.length || ""}</sup></button>
          <button aria-label="Open bag" className="bag-button" onClick={() => setCartOpen(true)}>Bag <span>{cart.length}</span></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">The autumn edit / 2026</p>
          <h1>Life, <em>well made.</em></h1>
          <p className="hero-description">A considered collection of everyday pieces for the way you live now.</p>
          <div className="hero-actions"><a className="button button-dark" href="#shop">Shop the collection <span>→</span></a><a className="text-link" href="#stories">Meet the makers <span>↗</span></a></div>
        </div>
        <div className="hero-image"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=90" alt="Woman in a warm neutral outfit" /><span className="hero-sticker">Made to keep<br />forever <b>↗</b></span></div>
        <div className="hero-count"><b>01</b><span></span><small>04</small></div>
      </section>

      <section className="collection-intro" id="shop">
        <div><p className="eyebrow">Shop the collection</p><h2>Objects for every<br /><em>good day.</em></h2></div>
        <p>We believe the things you choose should make everyday life feel a little more considered. So we make space for only the pieces that earn their place.</p>
      </section>

      <section className="catalog" id="new">
        <div className="category-row" role="tablist" aria-label="Product categories">
          {categories.map((category) => <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => { setActiveCategory(category); setShowAll(true); }}>{category}</button>)}
        </div>
        <div className="catalog-header"><p>{filteredProducts.length} pieces to discover</p><button className="filter-button" onClick={() => setNotice("Filters are coming next—use the category edit to explore for now.")}>Filter +</button></div>
        <div className="product-grid">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} saved={saved.includes(product.id)} onSave={toggleSave} onQuickView={setQuickView} onAdd={addToCart} />)}
        </div>
        {visibleProducts.length === 0 && <div className="empty-results"><h3>Nothing quite matches that.</h3><button onClick={() => { setSearch(""); setActiveCategory("All"); }}>Clear your search</button></div>}
        {!showAll && !search && activeCategory === "All" && <div className="center-action"><button className="button button-light" onClick={() => setShowAll(true)}>Explore all {products.length} pieces <span>↓</span></button></div>}
      </section>

      <section className="editorial" id="stories">
        <div className="editorial-image"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90" alt="Two friends wearing understated fashion" /></div>
        <div className="editorial-copy"><p className="eyebrow">NOVA journal</p><h2>Meet the<br /><em>everyday icons.</em></h2><p>Not trends. Not throwaways. Just the uncomplicated pieces that become part of your personal language.</p><a className="text-link" href="#shop">Read the story <span>→</span></a><div className="quote">“The best kind of luxury is the one you use every day.”</div></div>
      </section>

      <section className="value-grid" id="about">
        <div><span>01</span><h3>Designed to last</h3><p>Enduring materials and timeless forms, selected to stay with you for years.</p></div>
        <div><span>02</span><h3>Made with care</h3><p>Small-batch partners who share our exacting standards and values.</p></div>
        <div><span>03</span><h3>Here for the ride</h3><p>Honest prices, easy returns, and real people whenever you need us.</p></div>
      </section>

      <section className="newsletter">
        <div><p className="eyebrow">A note from us, occasionally</p><h2>Good things,<br /><em>in your inbox.</em></h2></div>
        <form onSubmit={handleNewsletter}><label htmlFor="email">Email address</label><div><input id="email" required type="email" placeholder="you@example.com" /><button aria-label="Subscribe">→</button></div><small>By signing up, you agree to our privacy policy. No noise, ever.</small></form>
      </section>

      <footer><a className="wordmark" href="#top">NOVA<span>.</span></a><div className="footer-links"><a href="#shop">Shop</a><a href="#stories">Journal</a><a href="#about">About</a><a href="#top">Instagram</a></div><p>© 2026 Nova Goods. Made for good days.</p></footer>

      {quickView && <div className="modal-backdrop" role="presentation" onMouseDown={() => setQuickView(null)}><article className="quick-view" role="dialog" aria-modal="true" aria-label={`Quick view ${quickView.name}`} onMouseDown={(event) => event.stopPropagation()}><button className="close" onClick={() => setQuickView(null)} aria-label="Close quick view">×</button><div className="quick-image" style={{ background: quickView.tone }}><img src={quickView.image} alt={quickView.name} /></div><div className="quick-content"><p className="eyebrow">{quickView.category}</p><h2>{quickView.name}</h2><div className="rating">★★★★★ <span>{quickView.rating.toFixed(1)} ({quickView.reviews})</span></div><p>{quickView.description}</p><div className="color-choice"><span>Color: <b>Natural</b></span><i></i><i></i><i></i></div><div className="size-choice"><button>XS</button><button>S</button><button className="selected">M</button><button>L</button><button>XL</button></div><button className="button button-dark full" onClick={() => addToCart(quickView)}>Add to bag — {formatPrice(quickView.price)}</button><small>Free shipping over $100 · Easy 30-day returns</small></div></article></div>}

      {cartOpen && <div className="cart-panel"><button className="cart-overlay" aria-label="Close bag" onClick={() => setCartOpen(false)}></button><aside><div className="cart-head"><h2>Your bag <span>({cart.length})</span></h2><button className="close" onClick={() => setCartOpen(false)} aria-label="Close bag">×</button></div>{cart.length ? <><div className="cart-list">{cart.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><div style={{ background: item.tone }}><img src={item.image} alt="" /></div><p><b>{item.name}</b><span>{item.category}</span><strong>{formatPrice(item.price)}</strong></p><button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>×</button></div>)}</div><div className="cart-summary"><p><span>Subtotal</span><b>{formatPrice(subtotal)}</b></p><small>Taxes and shipping calculated at checkout.</small><button className="button button-dark full" onClick={() => { setNotice("Checkout is ready to connect to your preferred payment provider."); setCartOpen(false); }}>Continue to checkout <span>→</span></button></div></> : <div className="cart-empty"><span>◌</span><h3>Your bag is waiting.</h3><p>Add something you’ll love living with.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Keep shopping</button></div>}</aside></div>}
    </main>
  );
}

function ProductCard({ product, saved, onSave, onQuickView, onAdd }: { product: Product; saved: boolean; onSave: (id: number) => void; onQuickView: (product: Product) => void; onAdd: (product: Product) => void }) {
  return <article className="product-card"><div className="product-image" style={{ background: product.tone }}><img src={product.image} alt={product.name} loading="lazy" /><div className="product-tools"><button onClick={() => onQuickView(product)}>Quick view</button><button className="add-icon" aria-label={`Add ${product.name} to bag`} onClick={() => onAdd(product)}>+</button></div>{product.badge && <span className="product-badge">{product.badge}</span>}<button className={saved ? "save saved" : "save"} onClick={() => onSave(product.id)} aria-label={`Save ${product.name}`}>♡</button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.category}</p></div><div className="prices"><b>{formatPrice(product.price)}</b>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div></div></article>;
}
