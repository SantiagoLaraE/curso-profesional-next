import { XCircleIcon } from '@heroicons/react/solid';

const Alert = ({ alert, handleClose }) => {
  if (alert && alert?.autoClose) {
    setTimeout(() => {
      handleClose();
    }, 5000);
  }
  const colorOptions = {
    success: 'bg-green-100 ',
    error: 'bg-red-100 ',
  };

  return (
    <>
      {alert?.active && (
        <div x-data="true" className={`${colorOptions[alert.type]} p-5 w-full rounded mb-8`}>
          <div className="flex space-x-3">
            <div className="flex-1 leading-tight text-sm text-black font-medium">{alert.message}</div>
            <button type="button" onClick={handleClose}>
              <XCircleIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
