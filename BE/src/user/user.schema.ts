import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  password?: string;
  @Prop()
  gender?: string;
  @Prop({ default: now() })
  joinDate?: Date;
  @Prop()
  phoneNumber?: string;
  @Prop()
  email: string;
  @Prop([String])
  skill: string[];
  @Prop({ default: 'ClIENT' })
  role: 'CLIENT' | 'MODERATOR' | 'ADMIN';
}

export const UserSchema = SchemaFactory.createForClass(User);
