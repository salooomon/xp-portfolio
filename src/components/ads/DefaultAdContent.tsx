import '../../styles/ad.css'

export const DefaultAdContent = () => (
    <div className="window-master">
        <div className="master-content" style={{ textAlign: 'center', padding: 10 }}>
            <h4>ВАШЕМУ САЙТУ НУЖЕН МАСТЕР</h4>
            <p>Немедленно позвоните по номеру:</p>
            <p style={{ fontSize: 24, fontWeight: 'bold', color: 'red' }}>
                8-800-XXX-XXXX
            </p>
            <p>Наши специалисты помогут вам!</p>
            <button
                className="btn"
                style={{ marginTop: 10 }}
                onClick={() => window.open('https://t.me/kirillpopoooov')}
            >
                Получить помощь сейчас
            </button>
        </div>
    </div>
);