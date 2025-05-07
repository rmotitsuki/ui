function format_error(str, error) {
  //Regular expression matches strings with {s} or {d}
  return str.replace(/{([sd])}/g, function (match) {
    switch (match) {
      case "{d}":
        return error.response.data.description;
      case "{s}":
        return error.response.status;
      default:
        return match;
    }
  });
}

const post_error = (_this, error, title = "{s}", description = "{d}") => {
  let notification = {
    icon: "gear",
    title: format_error(title, error),
    description: format_error(description, error),
  };

  _this.$kytos.eventBus.$emit("setNotification", notification);
};

const http_helpers = { post_error };

export default http_helpers;
