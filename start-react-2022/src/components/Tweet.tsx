type TweetProps = {
  text: string;
};

export function Tweet({ text }: TweetProps) {
  return <p>{text}</p>;
}
