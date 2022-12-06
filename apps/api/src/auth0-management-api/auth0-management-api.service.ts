import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Auth0User, MachineToMachineAccessTokenResponse } from '@newsfeed/data';

@Injectable()
export class Auth0ManagementApiService {
  private readonly managementApiBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.managementApiBaseUrl = this.configService.get(
      'AUTH0_AUDIENCE_MANAGEMENT_API'
    );
  }
  // TODO: Store access token to reuse it.
  async getAccessToken(): Promise<MachineToMachineAccessTokenResponse> {
    try {
      const { data } = await axios.post(
        `${this.configService.get('AUTH0_DOMAIN')}oauth/token`,
        {
          client_id: this.configService.get(
            'AUTH0_MACHINE_MANAGEMENT_API_CLIENT_ID'
          ),
          client_secret: this.configService.get(
            'AUTH0_MACHINE_MANAGEMENT_API_CLIENT_SECRET'
          ),
          audience: this.managementApiBaseUrl,
          grant_type: 'client_credentials',
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );
      return data;
    } catch (error) {
      console.log('auth0 error', error);
      throw error;
    }
  }

  async getUserById(auth0UserId: string): Promise<Auth0User | null> {
    const accessToken = await this.getAccessToken();
    const { data } = await axios.get(
      `${this.managementApiBaseUrl}users/${auth0UserId}`,
      {
        headers: { Authorization: `Bearer ${accessToken.access_token}` },
      }
    );
    return data;
  }
}
