
import groups from "./vaccine-group.json"
import antigens from "./antigen.json";
import vaccines from "./vaccine.json";
import testcases from "./case.json";
import observations from "./observation.json";

export default {
    groups: groups.map(item => ({ name: item.key, desc: item.name })),
    antigens: antigens.map(item => ({ name: item.key, desc: item.name })),
    testcases: testcases.map(item => ({ id: item.key, desc: item.testcaseName })),
    vaccines: vaccines.map(item => ({ cvx: item.key, desc: item.shortDescription })),
    observations: observations.map(item => ({ code: item.key, desc: item.observationTitle }))
}
