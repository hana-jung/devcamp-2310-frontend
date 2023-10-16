import useAuthButton from "../../hooks/auth/useAuthButton"

const NavigationBar: React.FC = () => {
  const { handleButtonClick } = useAuthButton()

  return (
    <nav className="flex h-14 w-[375px] items-center justify-end border-b border-navy bg-white px-4 py-1">
      <button className="btn-navy h-8 w-[67px]" onClick={handleButtonClick}>
        로그인
      </button>
    </nav>
  )
}

export default NavigationBar
