import { Interpolation, Theme } from "@emotion/react";

export const UserAvatar = (props: { url?: string }) => {
  return (
    <img
      src={props.url ? props.url : "/assets/images/default_avatar.svg"}
      className="user-avatar large-avatar"
      onError={(e) =>
        (e.currentTarget.src = "/assets/images/default_avatar.svg")
      }
    />
  );
};
export const ImageWFallback = (
  props: React.ClassAttributes<HTMLImageElement> &
    React.ImgHTMLAttributes<HTMLImageElement> & {
      css?: Interpolation<Theme>;
    }
) => {
  return (
    <img
      {...props}
      onError={(e) =>
        (e.currentTarget.src = "/assets/images/default_banner.svg")
      }
    />
  );
};
