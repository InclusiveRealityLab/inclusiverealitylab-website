function extractYear(givenDate) {
    return new Date(givenDate).getFullYear().toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" }).replace(",", "");

}
export default extractYear;