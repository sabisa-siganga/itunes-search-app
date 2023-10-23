const checkResult = (resultItems, favouritesItem) => {
  return resultItems.find((item) => {
    if (
      item.author === favouritesItem.author &&
      item.title === favouritesItem.title
    ) {
      return true;
    }

    return false;
  });
};

module.exports = { checkResult };
