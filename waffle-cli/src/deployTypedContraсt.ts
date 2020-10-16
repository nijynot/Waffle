import {ContractFactory, providers, Wallet} from 'ethers';
import {defaultDeployOptions} from '.';

export type Newable<T> = { new(...args: any[]): T };

export async function deployTypedContract<T extends ContractFactory>(
  wallet: Wallet,
  Factory: Newable<T>,
  args: Parameters<T['deploy']>,
  overrideOptions: providers.TransactionRequest = {}
): Promise<ReturnType<T['deploy']>> {
  const contractFactory = new Factory(wallet);
  const contract = await contractFactory.deploy(...args, {
    ...defaultDeployOptions,
    ...overrideOptions
  });
  return contract.deployed();
}
