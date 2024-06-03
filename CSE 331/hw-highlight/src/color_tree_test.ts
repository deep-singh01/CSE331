import * as assert from 'assert';
import { buildBst, makeColorTree, search } from './color_tree';
import { empty, node} from './color_node';
import { cons, explode_array, nil } from './list';


describe('color_tree', function() {

    // TODO: Uncomment given examples and add more test cases in 3

    it('buildBst', function() {
        // 0-1-Many Heurisitic
        // 0-1-Many: base case - L is empty
        assert.deepEqual(buildBst(explode_array([])), empty);

        // 0-1-Many: 1 recursive call - L has 1 element
        assert.deepEqual(buildBst(explode_array([
             ['Blue', '#0000FF', true],
           ])), node(['Blue', '#0000FF', true], empty, empty));
        assert.deepEqual(buildBst(explode_array([
             ['Red', '#FF0000', false],
           ])), node(['Red', '#FF0000', false], empty, empty));
        
        // 0-1-Many: 2+ recursive calls - L has 2+ elements
        assert.deepEqual(buildBst(explode_array([
            ['Blue', '#0000FF', true],
            ['Red', '#FF0000', true],
        ])), node(['Red', '#FF0000', true], node(['Blue', '#0000FF', true], empty,
        empty), empty));
        assert.deepEqual(buildBst(explode_array([
            ['Blue', '#0000FF', true],
            ['Green', '#00FF00', true],
            ['Red', '#FF0000', true]
        ])), node(['Green', '#00FF00', true], node(['Blue', '#0000FF', true], empty, empty),
        node(['Red', '#FF0000', true], empty, empty)));
    });

    it('search', function() {
        // 0-1-Many: base case - root is empty
        assert.deepStrictEqual(search('Red', empty), undefined);
        assert.deepStrictEqual(search('Blue', empty), undefined);

        // 0-1-Many: base case - root is correct color
        assert.deepStrictEqual(search('Yellow', 
            node(['Yellow', '#FFFF00', false], empty, empty)), 
            ['Yellow', '#FFFF00', false]);
        assert.deepStrictEqual(search('Green',
            node(['Green', '#00FF00', true], empty, empty)),
            ['Green', '#00FF00', true]);
        
        // 0-1-Many: 1 recursive call
        assert.deepStrictEqual(search('Blue',
            node(['Red', '#FF0000', true], empty, empty)),
            undefined);
        assert.deepStrictEqual(search('White',
            node(['Red', '#FF0000', true], empty, node(['White', '#FFFFFF', false], empty, empty))),
            ['White', '#FFFFFF', false]);
        
        // 0-1-Many: 2+ recursive calls
        assert.deepEqual(search('Green', 
            node(['Red', '#FF0000', true], node(['Blue', '#0000FF', true], empty, 
            node(['Green', '#00FF00', true], empty, empty)), empty)),
            ['Green', '#00FF00', true]);
        assert.deepEqual(search('Green', 
            node(['Blue', '#FF0000', true], empty, node(['Red', '#0000FF', true], 
            node(['Green', '#00FF00', true], empty, empty), empty))),
            ['Green', '#00FF00', true]);
        assert.deepEqual(search('White', 
            node(['Blue', '#FF0000', true], empty, node(['Red', '#0000FF', true], empty, 
            node(['White', '#FFFFFF', true], empty, empty)))),
            ['White', '#FFFFFF', true]);
        assert.deepEqual(search('Blue',
            node(['White', '#FFFFFF', true], node(['Red', '#FF0000', true], 
            node(['Blue', '#0000FF', true], empty, empty), empty), empty)),
            ['Blue', '#0000FF', true]);
    });

    // TODO: copy some tests over here in 3g
    const colorTree = makeColorTree();

    it('findNameSet', function() {
        assert.deepEqual(colorTree.findNameSet("doesnotexist"), nil);
        assert.deepEqual(colorTree.findNameSet("notacolor"), nil);
        assert.deepEqual(colorTree.findNameSet("indigo"), cons("indigo", nil));
        assert.deepEqual(colorTree.findNameSet("azure"), cons("azure", nil));
        assert.deepEqual(colorTree.findNameSet("lavender"),
            cons("lavender", cons("lavenderblush", nil)));
        assert.deepEqual(colorTree.findNameSet("pink"),
            cons("deeppink", cons("hotpink", cons("lightpink", cons("pink", nil)))));
    });

    it('getColorCss', function() {
        assert.deepEqual(colorTree.getColorCss("lavender"), ['#E6E6FA', '#101010']);
        assert.deepEqual(colorTree.getColorCss("indigo"), ['#4B0082', '#F0F0F0']);
    });
    
});