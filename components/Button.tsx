import classNames from "classnames";
type Props = JSX.IntrinsicElements["button"] & {
  // ? berarti optional tidak wajib ada nama terserah bisa size?/ukuran?
  size?: "normal" | "large";
  isFullWidth?: boolean;
};

// penambahan argument size = normal itu default propery size
// ... sprite operator
const Button: React.FC<Props> = ({
  size = "normal",
  isFullWidth = false,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        "bg-blue-800 text-sm font-sans text-white px-4 rounded-full",
        {
          "h-6": size === "normal",
          "h-10": size === "large",
          "w-full": isFullWidth,
        }
      )}
      {...rest}
    />
  );
};

export default Button;
