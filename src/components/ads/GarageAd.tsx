import '../../styles/ad.css'

export const GarageAd = () => (
    <div className="garage-ad-window">
        <h4 className="garage-ad-title">ПРОДАМ ГАРАЖ</h4>
        <p>Металлический, сухой, теплый. Район Северный.</p>
        <p className="garage-ad-price">Цена: 150 000 ₽</p>
        <p>Торг уместен. Все вопросы по телефону:</p>
        <p className="garage-ad-phone">8-900-123-45-67</p>
        <button
            className="garage-ad-btn"
            onClick={() => window.open('https://t.me/kirillpopoov')}
        >
            Узнать подробности
        </button>
    </div>
);
