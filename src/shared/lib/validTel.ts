export function isValidPhone(phone) {
    return /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(phone);
}
