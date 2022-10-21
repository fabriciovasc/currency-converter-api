import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { prismaClient } from '../../src/database';

jest.mock('../../src/database', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}));

const prismaMock = prismaClient as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

export default prismaMock;
