import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Job } from './job.schema';
@Injectable()
export class JobService {
  constructor(
    @InjectModel('Job') private jobModel: Model<Job>,
    @InjectConnection() private connection: Connection,
  ) {}

  async addJob(body: Job): Promise<Job> {
    console.log(body.wage);

    const createJob = new this.jobModel({ ...body, wage: body.wage });
    return createJob.save();
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec(); //sort.({createdAt: -1})
  }

  async findJob(id: string): Promise<Job> {
    console.log('find Job id', id);
    const result = await this.jobModel.findById(id).exec();
    console.log(' found job', result);
    return result;
  }

  async generateStaticId(): Promise<Job[]> {
    const query = await this.jobModel.find({}).select({ _id: 1 });
    // console.log('static paths', query);
    return query;
  }

  async getPostedJobsByUserId(postedBy: string): Promise<Job[]> {
    const postedJobs = await this.jobModel.find({ postedBy: postedBy });
    return postedJobs;
  }
}
