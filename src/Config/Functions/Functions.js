
export function navigate(navigation, route, data) {
    if (route) return navigation.navigate(route, {item: data});
    return navigation.goBack();
  }