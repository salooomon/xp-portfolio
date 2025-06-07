export const FakeAntivirus = () => (
    <div className="ad-content">
        <div style={{ display: 'flex', padding: 10 }}>
            <div>
                <h3>Обнаружено 127 вирусов!</h3>
                <p>Ваша система безопасности под угрозой</p>
                <div className="progress-bar" style={{ margin: '10px 0' }}>
                    <div style={{ width: '85%', backgroundColor: 'red', height: 10 }}></div>
                </div>
                <button className="btn" style={{ backgroundColor: 'green' }}>
                    Немедленно очистить
                </button>
            </div>
        </div>
    </div>
);