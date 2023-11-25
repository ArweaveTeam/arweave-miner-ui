interface Parsed_log_line {
  type: string;
  date: string;
  event: string;
  msg: string;
}

export function logParser(content: string) {
  const unknownLineList: string[] = [];
  const typedLineListDict: Map<string, Parsed_log_line[]> = new Map();
  typedLineListDict.set("error", []);
  typedLineListDict.set("warning", []);
  typedLineListDict.set("notice", []);
  typedLineListDict.set("info", []);
  content.split("\n").forEach((line) => {
    line = line.trim();
    if (!line) return;

    // 2023-01-08T19:33:43.764247+00:00 [warning]
    const regexpResult = /^([-\dT:.+]+) \[([a-z]+)\] (.*)$/.exec(line);
    if (!regexpResult) {
      unknownLineList.push(line);
      return;
    }
    const [date, type, msg] = regexpResult;
    const dictVal = typedLineListDict.get(type);
    if (!dictVal) {
      unknownLineList.push(line);
      return;
    }
    let event = "";
    const eventRegexpResult = /event:\s*(\S*)$/.exec(line);
    if (eventRegexpResult) {
      event = eventRegexpResult[1];
    }

    dictVal.push({
      date,
      type,
      event,
      msg,
    });
  });

  return {
    unknownLineList,
    typedLineListDict,
  };
}

// known events
export const EVENT_MINED_BLOCK = "mined_block";
export const EVENT_FOUND_MINING_SOLUTION = "found_mining_solution";
