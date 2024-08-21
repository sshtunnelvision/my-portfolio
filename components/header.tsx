const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-2xl px-2 font-bold">Arek Halpern</h1>
      <p className="text-sm py-4 mx-auto max-w-xs text-center">
        <span className="text-orange-500 font-semibold">Disclaimer:</span> This
        is an experimental project. My assistant may hallucinate and say things
        about me that are not factual. Please download my CV using the button
        below for 100% accurate information. With that being said, have fun
        chatting with my assistant!
      </p>
    </div>
  );
};

export default Header;
