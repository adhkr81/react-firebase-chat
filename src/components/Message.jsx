import { formatRelative } from 'date-fns'; 
 
 export default function Message ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
  }) {

    const formatDate = date => {
        let formattedDate = '';
        if (date) {
          // Convert the date in words relative to the current date
          formattedDate = formatRelative(date, new Date());
          // Uppercase the first letter
          formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }
        return formattedDate;
      };


    if (!text) return null;
  
    return <div>
 {photoURL ? (
        <img
          src={photoURL}
          alt="Avatar"
          className="rounded-full mr-4"
          width={45}
          height={45}
        />
      ) : null}
      {displayName ? <p>{displayName}</p> : null}
      {createdAt?.seconds ? (
        <span>{formatDate(new Date(createdAt.seconds * 1000))}</span>
      ) : null}
      <p>{text}</p>
    </div>;
  };
  