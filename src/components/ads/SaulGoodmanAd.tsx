import '../../styles/ad/saul.css';

export const SaulGoodmanAd = () => (
    <div className="sg-container">
        <div className="sg-topText">IN LEGAL TROUBLE?</div>

        <div className="sg-yellowBlock">
            <h2 className="sg-slogan">"Better Call Saul!"</h2>


            <div className="name-wrapper">
                <div className="sg-name">SAUL GOODMAN</div>
                <div className="sg-title">
                    ATTORNEY AT LAW
                </div>
            </div>

            <div className="number-wrapper">
                <div className="sg-phone">(505) 503‑4455</div>
                <div className="sg-callNow">CALL SAUL NOW!</div>
            </div>

            <div className="sg-saulImgWrap">
                <img src='/assets/icons/saul-goodman.png' alt="Saul Goodman" className="sg-saulImg" />
            </div>
        </div>

        <div className="sg-bottomText">
            NOT TOLL FREE • SE HABLA ESPAÑOL
        </div>
    </div>
);
