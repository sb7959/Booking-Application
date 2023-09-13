import "./mailList.css";

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mail-title">
        be the first to know about best deal and discount
      </h1>
      <span className="mail-description">subscribe for updates</span>
      <div className="mail-input-container">
        <input type="text" placeholder="email address" />
        <button>subscribe</button>
      </div>
    </div>
  );
};

export default MailList;
