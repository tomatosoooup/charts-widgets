const fakeHozixontalInfo = [
  {
    id: "1",
    text: "Oh! Hello. Now you are looking at horizontal chart :c",
    author: "Horizontal Mark Davidson",
  },

  {
    id: "2",
    text: "If u try to scroll down - nothing will happen ))",
    author: "Hope Its Funny",
  },

  {
    id: "3",
    text: "I don't know how I appeader here",
    author: "Oldrich Vanessa Kapova",
  },
];

export const HorizontalChart = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="font-semibold">Horizontal Chart</h1>
      <div className=" bg-slate-500/80 rounded-xl p-2 flex overflow-x-auto w-full">
        {fakeHozixontalInfo.map(({ id, text, author }) => (
          <div
            className="border-[3px] border-white p-2 rounded-lg flex-shrink-0 mr-2"
            key={id}
          >
            <p className="font-semibold">{text}</p>
            <p className="text-right text-sm">{author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
