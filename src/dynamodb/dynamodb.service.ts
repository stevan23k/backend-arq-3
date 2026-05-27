import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dynamoose from 'dynamoose';

@Injectable()
export class DynamodbService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const region = this.configService.get<string>('AWS_REGION');
    const endpoint = this.configService.get<string>('DYNAMODB_ENDPOINT');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    const ddb = new dynamoose.aws.ddb.DynamoDB({
      region,
      ...(endpoint && { endpoint }),
      ...(accessKeyId && secretAccessKey && {
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      }),
    });

    dynamoose.aws.ddb.set(ddb);
  }
}
