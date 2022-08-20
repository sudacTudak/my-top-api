export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Goods,
}

export class HhData {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
}

export class Advantage {
  title: string;
  description: string;
}

export class TopPageModel {
  firstCategory: TopLevelCategory;
  secondCategory: string;
  title: string;
  category: string;
  alias: string;
  hhData?: HhData;
  advantages?: Advantage[];
  seoText?: string;
  tagsTitle: string;
  tags: string[];
}
