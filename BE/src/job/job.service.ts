import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Job } from './job.schema';
@Injectable()
export class JobService {
  [x: string]: any;
  constructor(
    @InjectModel('Job') private jobModel: Model<Job>,
    @InjectConnection() private connection: Connection,
  ) {}

  async addJob(body: Job): Promise<Job> {
    const createJob = new this.jobModel({ ...body, wage: body.wage });
    return createJob.save();
  }

  async findAll(): Promise<Job[]> {
    const result = await this.jobModel.find({});
    return result;
  }

  async findJob(id: string): Promise<Job> {
    const result = await this.jobModel.findById(id).populate('postedBy');
    return result;
  }
  async filetredJob(query: { category: any; search: any }): Promise<Job[]> {
    const { category, search } = query;
    if (category === 'all') {
      const result = await this.jobModel.find({
        title: { $regex: new RegExp(search, 'i') },
      });
      return result;
    }
    const result = await this.jobModel.find({
      category,
      title: { $regex: new RegExp(search, 'i') },
    });
    console.log(' found job filterJobs ===> ', result);
    return result;
  }

  async generateStaticId(): Promise<Job[]> {
    const query = await this.jobModel.find({}).select({ _id: 1 });
    return query;
  }

  async getPostedJobsByUserId(postedBy: string): Promise<Job[]> {
    const postedJobs = await this.jobModel.find({ postedBy: postedBy });
    return postedJobs;
  }
}
