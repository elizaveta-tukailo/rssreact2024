export const calcPasswordStrength = (password: string): number => {
  let strength = 0;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength++;
  }
  if (/\d/.test(password)) {
    strength++;
  }
  if (password.length >= 8) {
    strength++;
  }
  if (/[a-z]/.test(password)) {
    strength++;
  }
  if (/[A-Z]/.test(password)) {
    strength++;
  }
  return Math.min(strength, 4);
};
