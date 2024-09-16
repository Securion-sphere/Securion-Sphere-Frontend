export interface LabDocker {
  name: string;
  ip: string;
  port: number;
  flag: string;
}

export const labDocker: LabDocker[] = [
  {
    name: "Web Application for SQL Injection",
    ip: "192.168.5.1",
    port: 1231,
    flag: "flag{1}",
  },
];
