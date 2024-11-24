export default function Header() {
  return (
    <header className=" pt-[10px] w-[80%] ml-auto mr-auto mb-[10px]  flex flex-row justify-between  items-center">
      <img src="/logo.png" alt="logo" className=" w-[90px] " />
      <button className=" w-[110px] h-[40px] rounded-[10px]  bg-main-blue text-white font-paper_logy text-[20px] hover:bg-main-light-blue  ">
        로그인
      </button>
    </header>
  );
}
