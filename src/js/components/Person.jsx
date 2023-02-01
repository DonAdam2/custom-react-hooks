const Person = ({ id, firstName, lastName, jobTitle, status }) => (
  <div className="person-wrapper">
    <img
      src={`https://avatars.dicebear.com/api/big-smile/${firstName}.svg`}
      alt={`profile-${id}`}
      className="item__img"
    />
    <div className="item__info">
      <p className="name">
        {firstName} {lastName}
      </p>
      <p className="job">{jobTitle}</p>
      <p
        className={`status ${
          status.toLowerCase() === 'active'
            ? 'success'
            : status.toLowerCase() === 'blocked'
            ? 'danger'
            : 'warn'
        }`}
      >
        {status}
      </p>
    </div>
  </div>
);

export default Person;
