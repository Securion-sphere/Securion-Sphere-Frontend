export interface LabDocker {
  name: string;
  ip: string;
  port: number;
}

export const labDocker: LabDocker[] = [
  {
    name: "Web Application for SQL Injection",
    ip: "192.168.5.1",
    port: 1231,
  },
  {
    name: "XSS is on the way!",
    ip: "192.168.5.2",
    port: 1232,
  },
  {
    name: "Let's try IDOR",
    ip: "192.168.5.3",
    port: 1233,
  },
  {
    name: "Business Logic on alert!",
    ip: "192.168.5.4",
    port: 1234,
  },
  {
    name: "Basic cookie misconfiguration",
    ip: "192.168.5.5",
    port: 1235,
  },
];
