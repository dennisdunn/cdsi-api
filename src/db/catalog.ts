
import groups from "./groups.json"
import antigens from "./antigens.json";
import vaccines from "./vaccines.json";
import testcases from "./testcases.json";
import observations from "./observations.json";

export default {
    groups: groups.map(item => ({ key: item.key, name: item.name })),
    antigens: antigens.map(item => ({ name: item.key, desc: item.name })),
    testcases: testcases.map(item => ({ id: item.key, desc: item.testcaseName })),
    vaccines: vaccines.map(item => ({ cvx: item.key, desc: item.shortDescription })),
    observations: observations.map(item => ({ code: item.key, desc: item.observationTitle }))
}
