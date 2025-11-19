// Configuration de l'administrateur
export const ADMIN_EMAIL = "matbdx3338@gmail.com"

/**
 * Vérifie si un utilisateur est administrateur
 * @param userEmail - L'email de l'utilisateur à vérifier
 * @returns true si l'utilisateur est admin, false sinon
 */
export const isAdmin = (userEmail: string | null | undefined): boolean => {
  if (!userEmail) return false
  return userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase()
}
