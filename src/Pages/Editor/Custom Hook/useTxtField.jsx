// This file consist the needed function which are common for both Input Field and Output Field

export const TxtField = (
    idx,
    setTxtArea1,
    setTxtArea2,
    setBtnColor1,
    setBtnColor2
) => {
    if (idx === 1) {
        setTxtArea1(true);
        setTxtArea2(false);
        setBtnColor1("blue");
        setBtnColor2("white");
    } else {
        setTxtArea1(false);
        setTxtArea2(true);
        setBtnColor1("white");
        setBtnColor2("blue");
    }
};