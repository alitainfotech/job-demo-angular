import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Job } from "./job";
import { Department } from "./department";

@Injectable({
  providedIn: "root",
})
export class JobService {
  BASE_URL: string = "http://192.168.29.199:8042/api";
  departments: Department[] = [
    {
      key: "job-1",
      value: "Job 1",
    },
    {
      key: "job-2",
      value: "Job 2",
    },
    {
      key: "job-3",
      value: "Job 3",
    },
  ];
  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    const url = `${this.BASE_URL}/Candidate/GetAllCandidate`;
    return this.http.get(url);
  }

  saveJob(job: any): Observable<any> {
    const url = `${this.BASE_URL}/Candidate/AddCandidate`;
    return this.http.post(url, job);
  }

  deleteJob(id: number): Observable<any> {
    const url = `${this.BASE_URL}/Candidate/DeleteCandidate?Id=${id}`;
    return this.http.delete(url);
  }

  uploadResume(formData: FormData): Observable<any> {
    const url = `${this.BASE_URL}/Candidate/uploadFile`;
    return this.http.post(url, formData, { responseType: "text" });
  }

  downloadResume(filename: string): Observable<any> {
    const url = `${this.BASE_URL}/Candidate/DownloadFile?file=${filename}`;
    return this.http.get(url, { responseType: "blob" });
  }

  getDepartments(): Department[] {
    return this.departments;
  }
  
  getDepartmentValue(departmentKey: string): string {
    const selectedDepartment = this.departments.find(
      (o) => o.key === departmentKey
    );
    return selectedDepartment ? selectedDepartment.value : "";
  }
}
