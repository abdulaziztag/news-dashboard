export type ModalDialogProps = {
  isOpen: boolean
  title: string | JSX.Element
  body: string | JSX.Element
  actions?: string | JSX.Element | boolean
  onClose: () => void
  onSubmit?: () => void
}
