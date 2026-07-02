import { useEffect, useRef } from 'react';
import { useCart } from '../../contexts/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { isDrawerOpen, closeDrawer, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDrawerOpen && drawerRef.current && !drawerRef.current.contains(e.target) && !e.target.closest('#cart-icon-btn')) {
        closeDrawer();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDrawerOpen, closeDrawer]);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isDrawerOpen]);

  const handleCheckout = () => {
    alert(`Thank you for your order! Total: $${cartTotal.toLocaleString()}`);
    closeDrawer();
  };

  return (
    <>
      <div className={`cart-overlay ${isDrawerOpen ? 'cart-overlay--open' : ''}`} aria-hidden="true" onClick={closeDrawer} />
      <div 
        ref={drawerRef}
        className={`cart-drawer ${isDrawerOpen ? 'cart-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Cart</h2>
          <button className="cart-drawer__close" onClick={closeDrawer} aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="cart-drawer__content">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <p>Your cart is currently empty.</p>
              <button className="btn btn--primary" onClick={closeDrawer}>Continue Shopping</button>
            </div>
          ) : (
            <ul className="cart-drawer__items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.label} className="cart-item__image" />
                  <div className="cart-item__details">
                    <h3 className="cart-item__title">PHANTOM</h3>
                    <p className="cart-item__color">{item.label}</p>
                    <div className="cart-item__actions">
                      <div className="cart-item__quantity">
                        <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <button className="cart-item__remove" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-item__price">${(item.price * item.quantity).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
            <p className="cart-drawer__taxes">Taxes and shipping calculated at checkout</p>
            <button className="btn btn--primary cart-drawer__checkout" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
