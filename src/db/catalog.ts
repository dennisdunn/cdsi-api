
import antigens from "./antigens.json";
import vaccines from "./vaccines.json";
import testcases from "./testcases.json";
import observations from "./observations.json";

export default {
    antigens: antigens.map(item => ({ key: item.key, desc: item.name })),
    testcases: testcases.map(item => ({ key: item.key, desc: item.testcaseName })),
    vaccines: vaccines.map(item => ({ key: item.key, desc: item.shortDescription })),
    observations: observations.map(item => ({ key: item.key, desc: item.observationTitle }))
}