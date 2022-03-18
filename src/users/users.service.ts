import { Injectable } from '@nestjs/common';
import { match } from 'assert';

export type User = any;
@Injectable()
export class UsersService {
    

    private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
    ];
  async newuser(request: any): Promise<any>{
      let user = request.body
      this.users.push({
      userId: user.id,
      username: user.username,
      password: user.password,
        
      })
    return 200
    }
    
    async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
