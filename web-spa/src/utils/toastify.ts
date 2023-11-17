import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type IToastifyType = 'info' | 'success' | 'warning' | 'error' | 'default'

const toastifyConfig: ToastOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
}

export const handleToastify = (text: string, type?: IToastifyType) => {
  switch (type) {
    case 'info':
      return toast.info(text, toastifyConfig)
    case 'success':
      return toast.success(text, toastifyConfig)
    case 'warning':
      return toast.warn(text, toastifyConfig)
    case 'error':
      return toast.error(text, toastifyConfig)
    case 'default':
      return toast(text, toastifyConfig)

    default:
      return toast(text, toastifyConfig)
  }
}
