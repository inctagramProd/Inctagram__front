import { useState } from 'react'
import { useDeletePostMutation } from '../../service/PostApi'

/**
 * Хук для удаления поста.
 *
 * @returns {object} - Объект, содержащий состояния и функции для удаления поста.
 * @property {boolean} open - Флаг, указывающий на открытие/закрытие модалки удаления поста.
 * @property {function} onDeleteOpen - Функция для открытия модалки удаления поста.
 * @property {function} onDeletePost - Функция для удаления поста.
 * @property {function} onClose - Функция для закрытия модалки удаления поста.
 */
export const UseDeletePost = () => {
  const [triger, { data }] = useDeletePostMutation()

  const [open, setOpen] = useState(false)

  /**
   * Функция для открытия модалки удаления поста.
   * @returns {void}
   */
  const onDeleteOpen = () => {
    setOpen(true)
  }

  /**
   * Функция для закрытия модалки удаления поста.
   * @returns {void}
   */
  const onClose = () => {
    setOpen(false)
  }

  /**
   * Функция для удаления поста.
   * @param {number} postId - Идентификатор удаляемого поста.
   * @returns {void}
   */
  const onDeletePost = (postId: number) => {
    triger(postId).then(() => {
      onClose()
    })
  }

  return {
    open,
    onDeleteOpen,
    onDeletePost,
    onClose,
  }
}
