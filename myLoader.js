module.exports = function myLoader (item) {
    console.log("hello myLoader!")
    return item.replace("console.log(", "alert(") // 아까는 console창에 5가 떴는데 이제 alert창에 5가 뜸 ㅋㅋ
    // JS 가 item으로 string으로 전달됨
}