export const defaultOnChange = (event, setter) => {
    setter(event.target.value);
}

export const addPleaseSelectOption = (t, options, setter) => {
    setter([{ id: null, name: t("base.pleaseSelect") }, ...options]);
}
