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
  {
    name: "XSS is on the way!",
    ip: "192.168.5.2",
    port: 1232,
    flag: "flag{2}",
  },
  {
    name: "Let's try IDOR",
    ip: "192.168.5.3",
    port: 1233,
    flag: "flag{3}",
  },
  {
    name: "Business Logic on alert!",
    ip: "192.168.5.4",
    port: 1234,
    flag: "flag{4}",
  },
  {
    name: "Basic cookie misconfiguration",
    ip: "192.168.5.5",
    port: 1235,
    flag: "flag{5}",
  },
];
