// A comparison's switch: the button pressed picks whose values its rows show.
export const wireCompare = () => {
  for (const box of document.querySelectorAll<HTMLElement>('.compare')) {
    const buttons = [...box.querySelectorAll<HTMLButtonElement>('.seg button')]
    for (const button of buttons)
      button.addEventListener('click', () => {
        box.dataset.show = button.dataset.i ?? '0'
        for (const other of buttons) other.setAttribute('aria-pressed', String(other === button))
      })
  }
}
