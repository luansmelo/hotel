export interface CountTotalUserRepository {
    countTotalUsers: () => Promise<number>
}