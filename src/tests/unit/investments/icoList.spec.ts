import { PillarSdk } from '../../../index';
import { Requester } from '../../../utils/requester';

describe('The Investment Class', () => {
  let pSdk: PillarSdk;

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey:
        'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
      investmentsUrl: 'http://localhost:8082',
    });
    jest
      .spyOn(Requester, 'execute')
      .mockImplementationOnce(() => Promise.resolve());
  });

  afterEach(() => {
    Requester.execute.mockRestore();
  });

  describe('icoList method', () => {
    it('should successfully call with valid data', async () => {
      const inputParams = {
        userId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      await pSdk.investments.icoList(inputParams);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          params: {},
          url:
            'http://localhost:8082/users/56b540e9-927a-4ced-a1be-61b059f33f2b/icos',
        }),
      );
    });

    it('should fail validation if one of the parameters is missing', async () => {
      const inputParams = {};

      expect.assertions(2);
      try {
        await pSdk.investments.icoList(inputParams);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'userId'");
      }
    });
  });
});